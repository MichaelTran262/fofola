import cronstrue from 'cronstrue';

export const isValidCron = (cronExpression) => {
    try {
        cronstrue.toString(cronExpression);
        return true;
    } catch (error) {
        return false;
    }
};

export const formatAsStartOfDay = (date) => date ? date.startOf('day').format() : null;

export const formatAsEndOfDay = (date) => date ? date.endOf('day').format() : null;
