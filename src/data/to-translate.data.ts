export default interface ToTranslate {
    key: string,
    params?: Array<string | number>
    noTranslate: boolean
}