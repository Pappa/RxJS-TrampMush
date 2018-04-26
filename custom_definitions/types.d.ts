declare namespace TweetStream {

	type Delimited = "length";
	type FilterLevel = "none" | "low" | "medium";
	type With = "user" | "followings";
	type Replies = "all";

	export interface Config {
		delimited?: Delimited;
		stall_warnings?: boolean;
		filter_level?: FilterLevel;
		language?: string;
		follow?: string;
		track?: string;
		locations?: string;
		count?: number;
		with?: With;
		replies?: Replies;
		stringify_friend_id?: boolean;
	}

}