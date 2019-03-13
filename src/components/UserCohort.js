import React from 'react';
import { Link } from '@reach/router';

const UserCohort = ({ cohort, cohortid }) => (
    <li>
        {cohortid}:{' '}
        <Link to={`/assistance/${cohortid}`}>
            Ir a página de asistencia
        </Link>
    </li>
);

export default UserCohort;