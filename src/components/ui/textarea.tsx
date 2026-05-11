import * as React from "react"
import { useImperativeHandle } from "react"

import { cn } from "@/lib/utils"

interface UseAutosizeTextAreaProps {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
  minHeight?: number
  maxHeight?: number
  triggerAutoSize: string
}

export const useAutosizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  const [init, setInit] = React.useState(true)

  React.useEffect(() => {
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    const offsetBorder = 6
    const textAreaElement = textAreaRef.current

    if (textAreaElement) {
      if (init) {
        textAreaElement.style.minHeight = `${minHeight + offsetBorder}px`
        if (maxHeight > minHeight) {
          textAreaElement.style.maxHeight = `${maxHeight}px`
        }
        setInit(false)
      }

      textAreaElement.style.height = `${minHeight + offsetBorder}px`
      const scrollHeight = textAreaElement.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight > maxHeight) {
        textAreaElement.style.height = `${maxHeight}px`
      } else {
        textAreaElement.style.height = `${scrollHeight + offsetBorder}px`
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAreaRef.current, triggerAutoSize, init, maxHeight, minHeight])
}

export type TextareaRef = {
  textArea: HTMLTextAreaElement
  maxHeight: number
  minHeight: number
}

type TextareaProps = {
  maxHeight?: number
  minHeight?: number
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 52,
      className,
      onChange,
      value,
      ...props
    }: TextareaProps,
    ref: React.Ref<TextareaRef>,
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
    const [triggerAutoSize, setTriggerAutoSize] = React.useState("")

    useAutosizeTextArea({
      textAreaRef,
      triggerAutoSize: triggerAutoSize,
      maxHeight,
      minHeight,
    })

    useImperativeHandle(
      ref,
      () => ({
        textArea: textAreaRef.current as HTMLTextAreaElement,
        focus: () => textAreaRef?.current?.focus(),
        maxHeight,
        minHeight,
      }),
      [maxHeight, minHeight],
    )

    React.useEffect(() => {
      setTriggerAutoSize(value as string)
    }, [props?.defaultValue, value])

    return (
      <textarea
        data-slot="textarea"
        ref={textAreaRef}
        className={cn(
          "flex min-h-[80px] w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onChange={(e) => {
          setTriggerAutoSize(e.target.value)
          onChange?.(e)
        }}
        value={value}
        {...props}
      />
    )
  },
)

Textarea.displayName = "Textarea"

export { Textarea }
