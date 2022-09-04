import React, { CSSProperties } from "react";
import { Steps } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";

interface StepProps {
  stepNumber: any,
  style: CSSProperties
}

const Step = Steps.Step;

export const OrderStep: React.FC<StepProps> = (props: React.PropsWithChildren<StepProps>) => {
  const { stepNumber, style } = props;
  const getStep = (value) => {
    if (value?.[0]?.status) {
      const temp = value?.[0]?.status;
      if (temp === 0) {
        return 1;
      }
      if (temp === 10) {
        return 2;
      }
      if (temp === 20) {
        return 3;
      }
    }
    return 1;
  };
  const t = useLocale(locale);
  return <Steps current={getStep(stepNumber) || 1} style={{ ...style }}>
    <Step title={t["workplace.drawer.details.schedule.step1.title"]}
          description={t["workplace.drawer.details.schedule.step1.description"]} />
    <Step title={t["workplace.drawer.details.schedule.step2.title"]}
          description={t["workplace.drawer.details.schedule.step2.description"]} />
    <Step title={t["workplace.drawer.details.schedule.step3.title"]}
          description={t["workplace.drawer.details.schedule.step3.description"]} />
  </Steps>;
};
