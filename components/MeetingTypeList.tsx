"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false); // to control button loading...

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      // for scheduling a meeting
      if(!values.dateTime){
        toast({
          title: "Please select a data and time"
        })
        return;
      }

      setIsLoading(true)
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      // time meeting starts
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      toast({
        title: "Meeting Created 🎉"
      })
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }

    } catch (error: any) {
      // console.log(error)
      toast({
        title: "Failed to create meeting", 
      })
      setIsLoading(false)
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        backgroundColor="bg-orange-1"
      />

      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        backgroundColor="bg-blue-1"
      />

      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        backgroundColor="bg-purple-1"
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        backgroundColor="bg-yellow-1"
      />

      {/* MEETING MODAL COMPONENT */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        isLoading={isLoading}
      />
    </section>
  );
};

export default MeetingTypeList;
