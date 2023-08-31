import { Button } from "@components/ui/button";
import Link from "next/link";

type MissionProps = {
  studentEmails: string[];
  teacherId: number;
};

const GoMission = ({ studentEmails, teacherId }: MissionProps) => {
  return (
    <Link
      href={`/teacher/${teacherId}/create?studentEmails=${JSON.stringify(
        studentEmails
      )}`}
    >
      <Button variant='outline' size='default' className='border'>
        미션
      </Button>
    </Link>
  );
};

export default GoMission;
