SELECT
    v.version as version,
    TO_CHAR(d.created_at, 'Mon dd - HH24:MI:SS') as created,
    e.name as env,
    rk.name as key,
    r.value as value,
    rk.specificity as specificity
FROM deploy as d
JOIN environment as e ON e.id = d.environment_id
JOIN version as v ON v.id = d.version_id
JOIN application as a ON a.id = v.application_id
JOIN rule as r ON r.environment_id = e.id
JOIN rule_key as rk ON rk.id = r.key_id
WHERE a.name = 'audit-logs'
AND (
    true
    --(rk.name = 'user' AND r.value = '444')
)
;