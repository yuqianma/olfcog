/*
Logit(y) = 2.147*Sex + 0.052*Age - 0.127*Education - 0.229*TaskB + 2.030*Smoke - 1.073
P = 1 / (1 + e^-Logit(y))
 */

export interface Variables {
	sex: 0 | 1,
	birthYear: number,
	education: number,
	taskB: number,
	smoke: 0 | 1,
}

export function computeP(values: Variables) {
	const { sex, birthYear, education, taskB, smoke } = values;
	const age = (new Date()).getFullYear() - birthYear;
	const logitY = 2.147 * sex + 0.052 * age - 0.127 * education - 0.229 * taskB + 2.030 * smoke - 1.073;
	const p = 1 / (1 + Math.E ** -logitY);
	return p;
}
