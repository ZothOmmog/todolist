import { IDalyItemForFetch, IDalyTableItemTaskDB } from "../components/daly-table/daly-table-slice";
import { connectDB } from "../indexedDB"
import { TODOS_TABLE_NAME } from "../indexedDB/indexedDB-constants";

const addTask = async (dalyItem: IDalyItemForFetch) => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDalyTableItemTaskDB[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        todosTable.add(dalyItem);

        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

const updateTask = async (dalyItem: IDalyTableItemTaskDB) => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDalyTableItemTaskDB[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        todosTable.put(dalyItem);

        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

const getAll = async () => {
    const db = await new Promise<IDBDatabase>((resolve) => {
        connectDB(resolve);
    });

    return new Promise<IDalyTableItemTaskDB[]>((resolve, reject) => {
        const transaction = db.transaction(TODOS_TABLE_NAME, "readwrite");
        const todosTable = transaction.objectStore(TODOS_TABLE_NAME);
        const request = todosTable.getAll();
        request.onsuccess = () => {
            if (request.result === undefined) resolve([]);
            else resolve(request.result);
        };
    });
}

export const dalyTableApi = {
    addTask,
    getAll,
    updateTask
}