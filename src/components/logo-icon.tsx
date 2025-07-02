import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-8 w-8", className)}
    >
      <title>CloudBloging Logo</title>
      <path
        d="M78.6,43.5c-0.5-10.4-8.8-18.8-19.3-18.8c-6.2,0-11.7,2.9-15.3,7.3c-2.4-1.9-5.4-3-8.7-3 c-7.5,0-13.6,6.1-13.6,13.6c0,1.9,0.4,3.7,1.1,5.4H22c-5.1,0-9.3,4.1-9.3,9.3s4.1,9.3,9.3,9.3h51.3 c5.1,0,9.3-4.1,9.3-9.3C82.6,45.7,80.9,44.1,78.6,43.5z"
        fill="#38B6FF"
      />
      <g transform="rotate(45, 60, 60)">
        <path fill="#FFC72C" d="M68.1,51.9L51.9,68.1c-0.6,0.6-1.5,0.6-2.1,0L35,53.3c-0.6-0.6-0.6-1.5,0-2.1l16.2-16.2 c0.6-0.6,1.5-0.6,2.1,0l14.8,14.8C68.7,50.4,68.7,51.3,68.1,51.9z"/>
        <polygon fill="#F44336" points="68.8,36.5 71,38.7 66.7,43 64.5,40.8"/>
        <polygon fill="#1E88E5" points="66.7,43 64.5,40.8 62,43.3 64.2,45.5"/>
        <polygon fill="#263238" points="34.3,52.6 32.1,54.8 36.3,59 38.5,56.8"/>
      </g>
    </svg>
  );
}
