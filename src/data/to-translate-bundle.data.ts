import ToTranslate from "./to-translate.data";

export default class ToTranslateBundle {
    private readonly _translate: Array<ToTranslate>

    constructor(key?: string, params?: Array<string | number>, noTranslate?: boolean) {
        this._translate = new Array<ToTranslate>;
        if (key)
            this.add(key, params, noTranslate)
    }

    add(key: string, params?: Array<string | number>, noTranslate?: boolean): void {
        this._translate.push({key: key, params: params, noTranslate: noTranslate ? noTranslate : false} as ToTranslate);
    }

    one(translate: { (key: string, list: unknown[]): string} ): string {
        return ToTranslateBundle.translateElement(this._translate.at(0), translate)
    }

    all(translate: { (key: string, list: unknown[]): string}, join?: string): string {
        return this._translate
            .map(element => element.noTranslate ? element.key : ToTranslateBundle.translateElement(element, translate))
            .join(join ? join : ' ')
    }

    toString(): string {
        return this._translate
            .map(bundle => bundle.key)
            .join(' ')
    }

    private static translateElement(element: ToTranslate | undefined, translate: { (key: string, list: unknown[]): string}): string {
        let translated :string;

        if(element) {
            translated = element.noTranslate ? element.key : translate(element.key, element.params ? element.params : []);
            if (translated === undefined)
                throw new Error('error during translated');
        } else throw new Error('key undefined');

        return translated
    }
}