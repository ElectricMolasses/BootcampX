SELECT cohorts.name AS cohort_name, COUNT(students.*) AS student_count
FROM cohorts
  JOIN students ON cohorts.id = cohort_id
GROUP BY cohort_name
HAVING COUNT(students.*) >= 18
ORDER BY COUNT(students.*);