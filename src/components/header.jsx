import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const  {user} = useUser();

  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  // Optional: Lock scroll when modal is open
  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSignIn]);

  // Optional: Focus modal on open
  useEffect(() => {
    if (showSignIn && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showSignIn]);

  useEffect(() => {
    if (search.get('sign-in')) {
      setShowSignIn(true)
    }
  }, [search])


  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link to={'/'}>
          <img src='/logo1.png' className='h-20 sm:h-16 md:h-20' alt='job-jump' />
        </Link>

        <div className='flex gap-8'>
          <SignedOut>
            <Button variant={"outline"} onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to='/post-job'>
                <Button variant={"destructive"} className="rounded-full">
                  <PenBox size={20} className='mr-2' />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-15 h-15"
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label='My Jobs'
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href='/my-jobs'
                />
                <UserButton.Link
                  label='Saved Jobs'
                  labelIcon={<Heart size={15} />}
                  href='/saved-jobs'
                />

              </UserButton.MenuItems>

            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
              appearance={{
                elements: {
                  card: 'shadow-xl rounded-lg',
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
