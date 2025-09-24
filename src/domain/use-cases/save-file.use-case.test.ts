import {SaveFile} from './save-file.use-case';
import fs, { mkdirSync } from 'fs';

describe('SaveFileUseCase', ()=>{
const options={
    fileContent:'custom content',
    fileDestination:'custom-outputs/file-destination',
    fileName:'custom-table-name'
}

    //beforeEach(()=>{

    //});

    afterEach(()=>{
        const outputFolderExist=fs.existsSync('outputs');
        if (outputFolderExist) fs.rmSync('outputs',{recursive:true});

        const customOutputFolderExist=fs.existsSync(options.fileDestination);
        if (customOutputFolderExist) fs.rmSync(options.fileDestination,{recursive:true});
    });

    test('should save file with default values',()=>{
        const saveFile=new SaveFile();
        const filePath='outputs/table.txt';
        const options={
            fileContent:'test content'
        }
        const result=saveFile.execute(options);

        const fileExists=fs.existsSync(filePath);
        const fileContent=fs.readFileSync(filePath,{encoding:'utf-8'});

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })

    test('should save file with custome values',()=>{
        const saveFile=new SaveFile();

        const filePath=`${options.fileDestination}/${options.fileName}.txt`;
                
        const result=saveFile.execute(options);
        const fileExists=fs.existsSync(filePath);
        const fileContent=fs.readFileSync(filePath,{encoding:'utf-8'});

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });
    test('should return false if directory could not be created',()=>{
        const saveFile=new SaveFile();
        const mkdirSpy=jest.spyOn(fs,'mkdirSync')
            .mockImplementation(()=>{throw new Error('This is a custom error message from testing')});
        const result=saveFile.execute(options);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created',()=>{
        const saveFile=new SaveFile();
        const writeFileSpy=jest.spyOn(fs,'writeFileSync')
            .mockImplementation(()=>{throw new Error('This is a custom writting error message')});
        const result=saveFile.execute({fileContent:'Hola'});

        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });
});