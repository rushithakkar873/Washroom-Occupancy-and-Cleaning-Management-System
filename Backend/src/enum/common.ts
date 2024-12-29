export enum UserRole {
  Janitor = "Janitor",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
}

export enum WashroomStatus {
  Available = "Available",
  Occupied = "Occupied",
  Cleaning = "Cleaning",
  Announcement = "Announcement",
}

export enum ActivityAction {
  Entry = "entry",
  Exit = "exit",
  CleaningStarted = "cleaning started",
  CleaningCompleted = "cleaning completed",
  Announcement = "Announcement",
}
