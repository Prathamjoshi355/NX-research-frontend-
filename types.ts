import React from 'react';
export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  domain: string;
  date: string;
  status: ApplicationStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ResearchArea {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FeatureItem {
  title: string;
  icon: React.ReactNode;
}

export enum FormType {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY'
}