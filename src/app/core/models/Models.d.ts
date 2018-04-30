export interface TwitterTweet {
	text: string
	id: number
	user: {
		screen_name: string
	}
}

export interface Tweet {
	text: string
	id: number
	username: string
  trimmed: string
}

export interface Sentiment {
	sentiment: string
	confidence: number
}

export interface Error {
	code?: number
	message: string
}

export interface Image {
	url: string
}

export interface CombinedResponse {
  tweet: Tweet
  image: Image
  sentiment: Sentiment
}
