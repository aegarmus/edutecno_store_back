import { findActiveRecordById, findAllActiveRecords, findRecordByFilters } from './GET/getActiveRecords.js';
import { createRecord } from './POST/createRecords.js';
import { updateRecord } from './PUT/updateRecords.js';
import { permaDeleteRecord, softDeleteRecord } from './DELETE/deleteRecords.js';

export {
    findActiveRecordById,
    findAllActiveRecords, 
    findRecordByFilters,
    createRecord,
    updateRecord,
    permaDeleteRecord,
    softDeleteRecord
}