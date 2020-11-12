import { AV } from "../store/AsyncValue";

export const onStart = payload => oldAV => AV.pending()
export const onSuccess = payload => oldAV => AV.success(payload)
export const onFailure = payload => oldAV => AV.failure(payload)