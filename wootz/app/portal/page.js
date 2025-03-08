"use client"
import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import "./portal.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Eventpage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const eventName = searchParams.get("event"); // Get event name from query params
  const pathSegments = pathname.split("/").filter(Boolean);

  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  var selectedEvent = "";
  const user = useSelector(state => state.auth.user)?.user;
  console.log("User:", user);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Events Data:", data.events); // Debugging
        setEvents(data.events);

        selectedEvent = data.events.find(
          (e) => e.title.toLowerCase().trim() === eventName?.toLowerCase().trim()
        );

        console.log("Selected Event:", selectedEvent); // Debugging
        setEventDetails(selectedEvent || null);
      });
  }, [eventName]);
  const isPaperPresentation = eventDetails?.title.toLowerCase() === "paper presentation 1";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="header">
          <div className="breadcrumb-container">
            <SidebarTrigger className="sidebar-trigger" />
            <Separator className="separator" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pathSegments.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/")
                  const isLast = index === pathSegments.length - 1;

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {decodeURIComponent(segment)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
                {eventName && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{decodeURIComponent(eventName)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="content">
          {eventDetails ? (
            <>
              <div className="event-intro">
                <div className="event-meta">
                  <div className="event-main-meta">
                    <h1 className="event-title">{eventDetails.title}</h1>
                    {user?.payment ? (
                      <span className="event-status-1">(registered)</span>

                    ) : (
                      <span className="event-status">(not registered)</span>

                    )}
                  </div>
                  {user === undefined ? (<div className="register-button">
                    <button className="event-register" onClick={() => window.location.href = "/auth/signup"}>Register</button>
                  </div>) : (user?.payment ? (<></>) :
                    (<div className="register-button">
                      <button className="event-register" onClick={() => window.location.href = "/auth/signup"}>Pay Now</button>
                    </div>))}

                </div>
                <p className="event-description">{eventDetails.description}</p>
              </div>

              <div className="event-content">
                {isPaperPresentation ? (
                  <>
                    <h2 className="section-title">Topics</h2>
                    <ul className="event-rounds">
                      {eventDetails.topics.map((topic, index) => (
                        <li key={index} className="round-card">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="section-title">Rounds</h2>
                    <div className="event-rounds">
                      {eventDetails.rounds?.map((round, index) => (
                        <div key={index} className="round-card">
                          <h3 className="round-title">Round {index + 1}: {round.name}</h3>
                          <p>{round.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )
                }

                <h2 className="section-title">Event Details</h2>
                <div className="event-details">
                  <div className="event-venue card">
                    <h3>Venue</h3>
                    <p><strong>Date:</strong> {eventDetails.venue.date}</p>
                    <p><strong>Time:</strong> {eventDetails.venue.time}</p>
                    <p><strong>Location:</strong> {eventDetails.venue.location}</p>
                    <p><strong>Team Size:</strong> {eventDetails.venue.teamSize}</p>
                  </div>

                  <div className="event-prizes card">
                    <h3>Prizes</h3>
                    <p><strong>Winner:</strong> ₹{eventDetails.venue.prizes.winner}</p>
                    <p><strong>First Runner-Up:</strong> ₹{eventDetails.venue.prizes.firstRunnerUp}</p>
                    <p><strong>Second Runner-Up:</strong> ₹{eventDetails.venue.prizes.secondRunnerUp}</p>
                  </div>

                  <div className="event-contact card">
                    <h3>Contacts</h3>
                    {eventDetails.contacts?.map((contact, index) => (
                      <p key={index}><strong>{contact.name}:</strong> {contact.phone}</p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="not-found">Event not found.</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider >
  );
}
