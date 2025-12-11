/**
 * Deployment Security Utilities
 * Provides logging, sanitization, and audit functionality
 */

import fs from 'fs';
import path from 'path';

/**
 * Log levels for structured logging
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

/**
 * Structured log entry
 */
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: string;
}

/**
 * Security event types for audit logging
 */
export enum SecurityEventType {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  ADMIN_ACTION = 'ADMIN_ACTION',
  DATA_ACCESS = 'DATA_ACCESS',
  DATA_MODIFICATION = 'DATA_MODIFICATION',
  AUTH_FAILURE = 'AUTH_FAILURE',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  DEPLOYMENT = 'DEPLOYMENT',
  CONFIG_CHANGE = 'CONFIG_CHANGE',
}

/**
 * Sanitize sensitive data from logs
 */
export function sanitizeLogData(data: any, sensitiveKeys: string[] = []): any {
  const defaultSensitiveKeys = [
    'password',
    'token',
    'secret',
    'api_key',
    'apiKey',
    'authToken',
    'clerkId',
    'databaseUrl',
    'DATABASE_URL',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  ];

  const allSensitiveKeys = [...defaultSensitiveKeys, ...sensitiveKeys];

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };

  for (const key of Object.keys(sanitized)) {
    if (allSensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key], sensitiveKeys);
    }
  }

  return sanitized;
}

/**
 * Mask sensitive patterns in strings
 */
export function maskSensitivePatterns(text: string): string {
  if (typeof text !== 'string') {
    return text;
  }

  // Mask email addresses
  text = text.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL]');

  // Mask API keys (common patterns)
  text = text.replace(/(?:api[_-]?key|token|secret)[:\s]*[\w\-]{20,}/gi, '[API_KEY]');

  // Mask database URLs
  text = text.replace(/(postgresql?|mysql|mongodb):\/\/[^\s]+/gi, '[DATABASE_URL]');

  // Mask JWT tokens
  text = text.replace(/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[JWT_TOKEN]');

  return text;
}

/**
 * Format a structured log entry
 */
function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, error } = entry;

  let log = `[${timestamp}] ${level}: ${message}`;

  if (context && Object.keys(context).length > 0) {
    const sanitized = sanitizeLogData(context);
    log += ` | ${JSON.stringify(sanitized)}`;
  }

  if (error) {
    log += ` | Error: ${error}`;
  }

  return log;
}

/**
 * Write log to file (server-side only)
 */
export function logToFile(entry: LogEntry, filename: string = 'app.log') {
  if (typeof window !== 'undefined') {
    // Client-side: don't write to files
    return;
  }

  try {
    const logDir = path.join(process.cwd(), 'logs');

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, filename);
    const formattedEntry = formatLogEntry(entry);

    fs.appendFileSync(logFile, formattedEntry + '\n');
  } catch (error) {
    console.error('Failed to write log file:', error);
  }
}

/**
 * Log a message with optional context
 */
export function log(
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  error?: Error
) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context: context ? sanitizeLogData(context) : undefined,
    error: error ? maskSensitivePatterns(error.message) : undefined,
  };

  const formatted = formatLogEntry(entry);

  // Log to console
  const consoleMethod = level === LogLevel.CRITICAL ? console.error : console.log;
  consoleMethod(formatted);

  // Log to file (server-side only)
  if (typeof window === 'undefined') {
    logToFile(entry);
  }
}

/**
 * Log audit event
 */
export async function logAuditEvent(
  eventType: SecurityEventType,
  details: Record<string, any>,
  userId?: string
) {
  const auditEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: LogLevel.INFO,
    message: `AUDIT: ${eventType}`,
    context: {
      eventType,
      userId,
      ...sanitizeLogData(details),
    },
  };

  const formatted = formatLogEntry(auditEntry);
  console.log(formatted);

  // Log to separate audit file
  if (typeof window === 'undefined') {
    logToFile(auditEntry, 'audit.log');
  }
}

/**
 * Clean up old log files
 */
export function cleanupOldLogs(daysToKeep: number = 30) {
  if (typeof window !== 'undefined') {
    return; // Client-side: skip cleanup
  }

  try {
    const logDir = path.join(process.cwd(), 'logs');

    if (!fs.existsSync(logDir)) {
      return;
    }

    const now = Date.now();
    const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

    fs.readdirSync(logDir).forEach(file => {
      const filePath = path.join(logDir, file);
      const stat = fs.statSync(filePath);

      if (now - stat.mtime.getTime() > maxAge) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old log file: ${file}`);
      }
    });
  } catch (error) {
    console.error('Error cleaning up logs:', error);
  }
}

/**
 * Verify environment variables are properly set
 */
export function verifyEnvironmentVariables(requiredVars: string[]): boolean {
  const missing: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    log(
      LogLevel.ERROR,
      'Missing required environment variables',
      { missing }
    );
    return false;
  }

  return true;
}

/**
 * Create deployment report
 */
export function createDeploymentReport(
  status: 'success' | 'failure',
  details: Record<string, any>
) {
  const report = {
    timestamp: new Date().toISOString(),
    status,
    environment: process.env.NODE_ENV,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7),
    ...sanitizeLogData(details),
  };

  console.log('\n=== DEPLOYMENT REPORT ===');
  console.log(JSON.stringify(report, null, 2));
  console.log('========================\n');

  if (typeof window === 'undefined') {
    logToFile(
      {
        timestamp: report.timestamp,
        level: status === 'success' ? LogLevel.INFO : LogLevel.ERROR,
        message: `Deployment ${status}`,
        context: report,
      },
      'deployment.log'
    );
  }
}
