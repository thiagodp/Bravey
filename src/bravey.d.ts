// Entities

export interface IntentEntity {
   entity: string;
   id: string;
}

export interface Entity<T = any> {
   entity: string;
   string: string;
   position: number;
   value: T;
   priority: number;
}

// Nlp 

export type Stemmer = (word: string) => string;
export type Filter = (tokens: string[]) => string[];

export interface NlpResult {
   entities: Entity[];
   entitiesIndex:	{ [key: string]: any };
   intent: string;
   score: number;
}

interface NlpCoreConstructor {
   new(nlpName: string, extensions?: {
      filter: Filter;
      stemmer: Stemmer;
   }): NlpCore;
}

type testMethods = "default"|"anyEntity";

interface NlpCore {
   addDocument(text: string, intent: string, guess?: {
      fromFullSentence?: boolean;   
      fromTaggedSentence?: boolean;
      expandIntent?: boolean;
      withNames?: string[];
   }): boolean;
   addEntity(entity: EntityRecognizer): boolean;
   addIntent(intentName: string, entities: IntentEntity[]): boolean;
   getConfidence(): number;
   hasEntity(entityName: string): boolean;
   setConfidence(ratio: number): void;
   test(text: string, method?: testMethods): NlpResult|false;
}

interface SequentialConstructor {
   new(): NlpCore;
}

interface FuzzyConstructor {
   new(): NlpCore;
}

export declare const Nlp: {   
   Fuzzy: FuzzyConstructor;
   Sequential: SequentialConstructor;
};

// Recognizers 

export type DateStamp = string;
export type TimeStamp = string;

export interface EntityRecognizer<T = any> {
   getEntities(string: string, out?: Entity[]): Entity<T>[];
   getName(): string;
}

type regexEntityRecognizerCallback = (match: string[]) => Entity|undefined;

interface RegexEntityRecognizerConstructor<T = any> {
   new(entityName: string): IRegexEntityRecognizer<T>;   
}

interface IRegexEntityRecognizer<T = any> extends EntityRecognizer<T> {   
   addMatch(regex: RegExp, callback: regexEntityRecognizerCallback, priority?: number): boolean;
}

interface StringEntityRecognizerConstructor {
   new(entityName: string, priority?: number): IStringEntityRecognizer;   
}

interface IStringEntityRecognizer extends EntityRecognizer<string> {
   addMatch(entityId: string, entityText: string): boolean;
}

interface EmailEntityRecognizerConstructor {
   new(entityName: string, priority?: number): EntityRecognizer<string>;   
}

interface DateEntityRecognizerConstructor  {
   new(entityName: string): EntityRecognizer<DateStamp>;
}

interface NumberEntityRecognizerConstructor  {
   new(entityName: string): EntityRecognizer<number>;
}

interface FreeTextEntityRecognizerConstructor  {
   new(entityName: string): EntityRecognizer<string>;
}

interface TimeEntityRecognizerConstructor  {
   new(entityName: string): EntityRecognizer<TimeStamp>;
}

type RecognitionFunction = ( text: string ) => { value: any, index: number }[];

interface FunctionEntityRecognizerConstructor {
    new(entityName: string, func: RecognitionFunction, priority?: number): EntityRecognizer<any>;   
 }

interface Range<T> {
   start: T;
   end: T;   
}

interface TimePeriodEntityRecognizerConstructor  {
   new(entityName: string): EntityRecognizer<Range<TimeStamp>>;
}

export const StringEntityRecognizer: StringEntityRecognizerConstructor;
export const RegexEntityRecognizer: RegexEntityRecognizerConstructor;
export const EmailEntityRecognizer: EmailEntityRecognizerConstructor;
export const DateEntityRecognizer: DateEntityRecognizerConstructor;
export const NumberEntityRecognizer: NumberEntityRecognizerConstructor;
export const FreeTextEntityRecognizer: FreeTextEntityRecognizerConstructor;
export const TimeEntityRecognizer: TimeEntityRecognizerConstructor;
export const TimePeriodEntityRecognizer: TimePeriodEntityRecognizerConstructor;
export const FunctionEntityRecognizer: FunctionEntityRecognizerConstructor;

// languages 

interface Language_EN {
   DateEntityRecognizer: DateEntityRecognizerConstructor;
   FreeTextEntityRecognizer: FreeTextEntityRecognizerConstructor;
   NumberEntityRecognizer: NumberEntityRecognizerConstructor;
   Stemmer: Stemmer;
   TimeEntityRecognizer: TimeEntityRecognizerConstructor;
   TimePeriodEntityRecognizer: TimePeriodEntityRecognizerConstructor;
}

interface Language_IT {
   DateEntityRecognizer: DateEntityRecognizerConstructor;
   FreeTextEntityRecognizer: FreeTextEntityRecognizerConstructor;
   NumberEntityRecognizer: NumberEntityRecognizerConstructor;
   Stemmer: Stemmer;
   TimeEntityRecognizer: TimeEntityRecognizerConstructor;
   TimePeriodEntityRecognizer: TimePeriodEntityRecognizerConstructor;
}

interface Language_PT {
   DateEntityRecognizer: DateEntityRecognizerConstructor;
   FreeTextEntityRecognizer: FreeTextEntityRecognizerConstructor;
   NumberEntityRecognizer: NumberEntityRecognizerConstructor;
   Stemmer: Stemmer;
   TimeEntityRecognizer: TimeEntityRecognizerConstructor;
   TimePeriodEntityRecognizer: TimePeriodEntityRecognizerConstructor;
}

interface Language {
   IT: Language_IT;
   EN: Language_EN;
   PT: Language_PT;
}

export const Language: Language;

// context manager

interface ContextManagerConstructor {
   new(extensions?: { sessionManager: any }): ContextManager;
}

interface ContextManager {
   addNlp(nlp: NlpCore, contexttags?: string[], method?: testMethods): void;
   clearSessionIdData(sessionid: string): boolean;
   getSessionIdData(sessionid: string): string[];
   removeContext(contexttag: string[]): void;
   removeNlp(nlp: NlpCore, contexttags?: string[]): void;
   reserveSessionId(id: string): string;
   setSessionIdContext(sessionid: string, contexttags: string[]): boolean;
   setSessionIdData(sessionid: string, data: {[key: string]: string}): boolean;
   testByContext(text: string, texttags?: string[]): ContextManagerResultByContext;
   testBySessionId(text: string, texttags?: string[]): ContextManagerResultBySessionId|false;
}

export interface ContextManagerResultByContext {
   result: NlpResult;
   context: string;
}

export interface ContextManagerResultBySessionId {
   result: NlpResult;
   context: string;
   sessionId: string;
   sessionContext: string;
   sessionData: any;   
}

// session manager 

interface SessionManager {
   clearData(sessionid: string): boolean;
   getContext(sessionid: string): string[];
   getData(sessionid: string): string[];
   keepAlive(sessionid: string): boolean;
   reserveSessionId(): string;
   setContext(sessionid: string, contexttags: string[]): boolean;
   setData(sessionid: string, data: {[key: string]: string}): boolean;
}

interface InMemorySessionManagerConstructor {
   new(): SessionManager;
}

export const InMemorySessionManagerConstructor: InMemorySessionManagerConstructor;

// ApiAi adapter

interface ApiAiAdapterConstructor {
   new(packagePath: string, extensions?: { language: string, nlp: string}): ApiAiAdapter;
}

interface ApiAiAdapter {
   nlp: NlpCore;
   loadEntity(name: string): void;
   loadIntent(name: string): void;
   prepare(cb: ()=>void): void;
   test(text: string, method?: testMethods): NlpResult;
}

export const ApiAiAdapter: ApiAiAdapterConstructor;

// document classifier

interface DocumentClassification {
   scores: number[];
   winner: {
      score: number;
      label: string;
   }
}

interface DocumentClassifierConstructor {
   new (extensions?: { stemmer?: string });
}

interface DocumentClassifier {
   addDocument(text: string, label: string): string;
   classifyDocument(text: string): DocumentClassification; 
}

// Basic filter

export const BasicFilter: Filter;
