/**
 * The response to a step up challenge
 */
export interface ChallengeResponse {
	/** The {@link PaymentInstrument} id related to the step up challenge. */
	instrumentId: string;

	/** The type of {@link ChallengeResponse.token} that has been provided */
	type: ChallengeResponseType;

	/** The value requested by the challenge. */
	token: string;

	/** An optional reference that could be used for audit tracing */
	reference?: string;
}

/** Possible types of challenges */
export enum ChallengeResponseType {
	STEP_UP = "STEP_UP",
	PASSCODE = "PASSCODE"
}
