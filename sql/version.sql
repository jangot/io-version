SELECT
	d.version_id,
	v.version,
	a.name,
	MAX(d.created_at) AS end_date
FROM deploy AS d
JOIN version AS v ON v.id = d.version_id
JOIN application AS a ON a.id = v.application_id
WHERE a.name = 'audit-logs'
GROUP BY d.version_id, a.name, v.version