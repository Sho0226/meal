import { Button, ButtonProps } from "@mantine/core";
import { TwitterIcon } from "@mantinex/dev-icons";

export function TwitterButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">,
) {
  return (
    <Button
      leftSection={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}
