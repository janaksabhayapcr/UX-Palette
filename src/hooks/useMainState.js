import React, { useCallback, useMemo, useState } from "react";

export default function useMainState(defaultStates = {}) {
	const [state, setState] = useState(defaultStates);

	const changeState = useCallback(
		(obj) => {
			setState((prev) => ({
				...prev,
				...obj,
			}));
		},
		[state]
	);

	return [state, changeState];
}
