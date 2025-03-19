import * as Tooltip from "@radix-ui/react-tooltip";

const CustomTooltip = ({ children, content }) => {
  // If content is empty or null, return just the children without a tooltip
  if (!content) {
    return children;
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 capitalize text-primary z-[999] relative bg-slate-100 border-primary border-[1px] shadow-lg px-3 py-1 rounded-md text-sm"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-primary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
