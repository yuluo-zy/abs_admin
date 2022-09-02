import React, { CSSProperties } from "react";
import { Steps } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";

interface StepProps {
  stepNumber: number,
  style: CSSProperties
}

const Step = Steps.Step;

export const OrderStep: React.FC<StepProps> = (props: React.PropsWithChildren<StepProps>) => {
  const { stepNumber, style } = props;
  const t = useLocale(locale);
  return <Steps current={stepNumber || 1} style={{ ...style }}>
    <Step title={t["workplace.drawer.details.schedule.step1.title"]}
          description={t["workplace.drawer.details.schedule.step1.description"]} />
    <Step title={t["workplace.drawer.details.schedule.step2.title"]}
          description={t["workplace.drawer.details.schedule.step2.description"]} />
    <Step title={t["workplace.drawer.details.schedule.step3.title"]}
          description={t["workplace.drawer.details.schedule.step3.description"]} />
  </Steps>;
};
