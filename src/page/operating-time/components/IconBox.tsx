import Icon from "../../../library/components/icon/icon";
import { OperationFunction } from "../script/_DurationList";
import { DayOfWeek } from "../../../@types/day";
import * as S from "../styles/IconBox.style";
interface Props {
  idx: number;
  day: DayOfWeek;
  disabled: boolean;
  operationFunction: OperationFunction;
}

const IconBox = ({ idx, day, disabled, operationFunction }: Props) => {
  const { removeOperatingTime, addOperatingTime } = operationFunction;

  return (
    <S.Wrap>
      <Icon.Delete
        onClick={disabled ? undefined : () => removeOperatingTime(day, idx)}
        color="disabled"
        data-testid={`${day}-${idx}-delete-icon`}
      />
      {idx === 0 && (
        <Icon.Plus
          onClick={disabled ? undefined : () => addOperatingTime(day)}
          color="disabled"
          data-testid={`${day}-${idx}-plus-icon`}
        />
      )}
    </S.Wrap>
  );
};

export default IconBox;
