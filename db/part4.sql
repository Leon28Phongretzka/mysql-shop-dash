# 4.1.
select * from `employees` where `first_name` like '%A%' or '%a%';
# 4.2.
select * from `employees` where `last_name` like '%V%' or '%v%';
# 4.3.
select * from `employees` where `department_id` is null;
# 4.4.
select * from `employees` where year(hire_date) >= 2000;
# 4.5.
select * from employees where month(hire_date) % 2 = 0;
# 4.6.
SELECT d.department_id, e.employee_id, e.last_name, e.first_name, e.hire_date,
       DATEDIFF(CURDATE(), e.hire_date) AS tenure
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE DATEDIFF(CURDATE(), e.hire_date) > 30 * 365
ORDER BY d.department_id, e.employee_id;
# 4.7.
select count(*) as total_emp from employees;
# 4.8 và 4.9
SELECT d.department_name, COUNT(e.employee_id) AS total_employees
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id;

# 4.10.
SELECT d.department_name, e.employee_id, e.last_name, e.first_name, e.hire_date, e.salary
FROM departments d
JOIN employees e ON d.department_id = e.department_id
WHERE e.salary = (
	SELECT MAX(salary)
	FROM employees
	WHERE department_id = d.department_id
)
ORDER BY d.department_id;

