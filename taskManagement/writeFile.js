const fs = require('fs');

let data =
  '[2024-10-24 09:00:00] [INFO] [TaskModule] Task #T001 assigned to User #U123.\n[2024-10-24 09:15:30] [ERROR] [DatabaseModule] Failed to update task status for Task #T002.\n[2024-10-24 09:30:00] [DEBUG] [UserModule] Debugging task assignment for Task #T003.\n[2024-10-24 09:45:15] [WARNING] [NotificationModule] Task #T004 notification failed to send to User #U124.\n[2024-10-24 10:00:45] [FATAL] [TaskModule] Critical error: Task #T005 deadline missed.';

try {
  fs.writeFileSync('task_log.txt', data, 'utf-8');
  console.log('Writing success.');
} catch (error) {
  console.error('Error: ', error);
}
