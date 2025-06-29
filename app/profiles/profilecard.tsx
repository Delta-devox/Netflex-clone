'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface ProfileCardProps { //To add types to the props, we create an interface with the name, so the name can be added as a type to the fc
  name: string;
}
// To add an interface as a type to the function, we use :React.FC<InterFace name> then passing the name to the function as a parameter 
const ProfileCard: React.FC<ProfileCardProps> = ({ name }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  // To add a gsap , animation, references must be created to the elements.The Types are HTMLDivElement
  //Animation, is like a sideEffects so , it must be included in the useEffect().
  useEffect(() => {
    const card = cardRef.current;
    const nameEl = nameRef.current;
    //const card = cardRef.current
    if (!card || !nameEl) return;
    //if the card or nameElement is not available then the animation won't be applied.
    // Timeline for the hover animation.
    //To animate, something timeLine must be there.
    // To create a timeLine : timeLine() Object is used, here Initially it is [paused].
    const tl = gsap.timeline({ paused: true });

    tl.to(nameEl, {  // tl is an instance of an object timeline. it will go to the original state.
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    });

    const handleEnter = () => tl.play(); 
    const handleLeave = () => tl.reverse();

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => router.push('/')}
      className="cursor-pointer"
    >
      <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white overflow-hidden transition">
          <img src="/images/ProfilesImage.avif" alt="profile" />
        </div>
        <div
          ref={nameRef}
          className="mt-4 text-gray-400 text-2xl text-center opacity-0 translate-y-4"
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
