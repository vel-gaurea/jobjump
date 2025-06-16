import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const handleLoginClick = () => {
    setShowSignIn(true);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showSignIn) {
        setShowSignIn(false);
        setSearch({});
      }
    };

    if (showSignIn) {
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [showSignIn, setSearch]);

  // Focus modal on open for accessibility
  useEffect(() => {
    if (showSignIn && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showSignIn]);

  // Handle URL parameter for sign-in
  useEffect(() => {
    if (search.get('sign-in')) {
      setShowSignIn(true);
    }
  }, [search]);

  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link to={'/'}>
          <img 
            src='/logo1.png' 
            className='h-20 sm:h-16 md:h-20' 
            alt='job-jump' 
          />
        </Link>

        <div className='flex gap-8 items-center'>
          <SignedOut>
            <Button 
              variant={"outline"} 
              onClick={handleLoginClick}
            >
              Login
            </Button>
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

      {/* Sign-in Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-modal"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="outline-none"
            onClick={(e) => e.stopPropagation()}
            role="document"
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