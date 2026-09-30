export function AppErrorMessage(props: { message: string }) {
  return <p className="text-center text-sm text-red-500">{props.message}</p>;
}
