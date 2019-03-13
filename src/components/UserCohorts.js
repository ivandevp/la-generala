import React from 'react';
import UserCohort from './UserCohort';

const UserCohorts = ({ cohorts }) => {
    if (!cohorts) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h3>Cohorts</h3>
            <ul>
                {Object.keys(cohorts).map(cohortKey => (
                    <UserCohort
                        key={cohortKey}
                        cohort={cohorts[cohortKey]}
                        cohortid={cohortKey}
                    />
                ))}
            </ul>
        </>
    );
};

export default UserCohorts;