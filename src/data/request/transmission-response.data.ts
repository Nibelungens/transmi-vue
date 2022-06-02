import Arguments from "./arguments.data";

export interface TransmissionResponse<T extends Arguments> {
    arguments: T
}