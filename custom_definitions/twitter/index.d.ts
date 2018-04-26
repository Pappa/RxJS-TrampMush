interface TwitterClient {
    get(url: any, params: any, callback?: any): any;
    post(url: any, params: any, callback?: any): any;
    stream(method: any, params: any, callback?: any): any;
}

interface TwitterClientOptions {
	consumer_key: string;
	consumer_secret: string;
	access_token_key: string;
	access_token_secret: string;
}

declare module 'twitter' {
	export class Twitter {
	    prototype: TwitterClient;
	    constructor (options: TwitterClientOptions);
	    //new (options: TwitterClientOptions): TwitterClient;
	    get(url: any, params: any, callback?: any): any;
	    post(url: any, params: any, callback?: any): any;
	    stream(method: any, params: any, callback?: any): any;
	}
}