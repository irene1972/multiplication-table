import {CreateTable} from './create-table.use-case'

describe('CreateTableUseCase', ()=>{
    test('should create table with default values',()=>{
        const createTable=new CreateTable();
        const table=createTable.execute({base:2});
        const rows=table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 * 1= 2');
        expect(table).toContain('2 * 10= 20');
        expect(rows).toBe(11);
    })
    test('should create table with custom values',()=>{
        const createTable=new CreateTable();
        const options={
            base:3,
            limit:20
        }
        const table=createTable.execute(options);
        const rows=table.split('\n').length;

        expect(table).toContain('3 * 1= 3');
        expect(table).toContain('3 * 10= 30');
        expect(table).toContain('3 * 20= 60');
        expect(rows).toBe(options.limit + 1);
    })
});