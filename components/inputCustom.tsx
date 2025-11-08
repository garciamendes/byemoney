import { RetroInput, InputProps } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

export type InputCustomProps = InputProps & {
  label?: string
  error?: string | undefined | null
}

export default function Input(props: InputCustomProps) {
  return (
    <div className="flex flex-col w-full gap-1.5">
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}

      <RetroInput
        aria-invalid={!!props.error}
        {...props}
      />

      {props.error && <p className="text-sm text-red-500">{props.error}</p>}
    </div>
  );
}