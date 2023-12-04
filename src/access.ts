/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { identity?: string } | undefined) {
  const { identity } = initialState ?? {};
  console.log(initialState);
  return {
    canStudent: identity === '0',
    canTeacher: identity === '1',
    canAdmin: identity === '2',
  };
}
