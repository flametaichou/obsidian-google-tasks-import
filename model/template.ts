export class Template {
    compileFunc: (...args: any) => string;

    constructor(f: (...args: any) => string) {
        this.compileFunc = f;
    }

    compile(...args: any): string {
        return this.compileFunc(...args);
    }
}