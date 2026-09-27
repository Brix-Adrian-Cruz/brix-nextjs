"use client";

import { useProgress } from "../_lib/progress";

type QuizItem = { q: string; o: string[]; a: number; w: string };

export default function Quiz({ dayId, quiz }: { dayId: number; quiz: QuizItem[] }) {
  const { p, update } = useProgress();
  const k = String(dayId);
  const answers = p.quiz[k] ?? {};
  const answered = Object.keys(answers);
  const right = answered.filter((qi) => quiz[Number(qi)]?.a === answers[qi]).length;

  const choose = (qi: number, oi: number) =>
    update((prev) => ({ ...prev, quiz: { ...prev.quiz, [k]: { ...(prev.quiz[k] ?? {}), [qi]: oi } } }));
  const retake = () =>
    update((prev) => {
      const rest = { ...prev.quiz };
      delete rest[k];
      return { ...prev, quiz: rest };
    });

  return (
    <div>
      {quiz.map((q, qi) => {
        const chosen = answers[String(qi)];
        const isAnswered = chosen !== undefined;
        return (
          <div className="trn-q" key={qi}>
            <div className="qt">{`${qi + 1}. ${q.q}`}</div>
            <div className="opts">
              {q.o.map((o, oi) => {
                let cls = "trn-opt";
                if (isAnswered && oi === q.a) cls += " right";
                else if (isAnswered && oi === chosen) cls += " wrong";
                return (
                  <button key={oi} type="button" className={cls} disabled={isAnswered} onClick={() => choose(qi, oi)}>
                    {o}
                  </button>
                );
              })}
            </div>
            {isAnswered && <div className="why">{chosen === q.a ? "✓ Correct. " : "✗ Not quite. "}{q.w}</div>}
          </div>
        );
      })}
      <div className="trn-row">
        <span className="trn-muted">{answered.length ? `Score: ${right}/${quiz.length}` : "Answer each question to see the explanation."}</span>
        {answered.length > 0 && <button type="button" className="trn-btn" onClick={retake}>{"Retake"}</button>}
      </div>
    </div>
  );
}
