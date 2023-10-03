const isTeacher = (userId: string | null | undefined) => {
  return userId === null || userId === undefined
    ? false
    : process.env
        .NEXT_PUBLIC_TEACHER_IDS!.split(",")
        .filter((id) => id === userId).length > 0;
};

export default isTeacher;
