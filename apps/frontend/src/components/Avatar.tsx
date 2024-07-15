export const Avatar = ({ username }: { username: string; size: string }) => {
  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
    {username.substring(0, 1)}
  </div>;
};
