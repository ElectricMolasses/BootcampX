const { Pool } = require('pg');

const args = process.argv.slice(2);
const values = [`%${args[0]}%`, args[1] || 5];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT teachers.name AS teacher,
      cohorts.name AS cohort
FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name
LIMIT $2;
`, values).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
}).catch(err => {
  console.log('query error', err.stack);
});