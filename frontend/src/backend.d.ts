import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface TestResult {
    wpm: bigint;
    duration: bigint;
    difficulty: string;
    testMode: TestMode;
    language: string;
    timestamp: Time;
    accuracy: number;
}
export enum TestMode {
    sentences = "sentences",
    custom = "custom",
    words = "words"
}
export interface backendInterface {
    getAllTestResults(): Promise<Array<TestResult>>;
    getAverageAccuracy(): Promise<number | null>;
    getAverageWPM(): Promise<number | null>;
    getBestWPM(): Promise<bigint | null>;
    getDailyStreaks(): Promise<bigint>;
    getStreakCalendar(): Promise<Array<[Time, boolean]>>;
    getTestResult(index: bigint): Promise<TestResult>;
    getTestResultRange(start: bigint, end: bigint): Promise<Array<TestResult>>;
    getTodaysResults(): Promise<Array<TestResult>>;
    getTotalTests(): Promise<bigint>;
    isRegistered(): Promise<boolean>;
    submitTestResult(wpm: bigint, accuracy: number, testMode: TestMode, language: string, difficulty: string, duration: bigint): Promise<void>;
}
