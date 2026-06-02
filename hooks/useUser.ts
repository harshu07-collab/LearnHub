'use client';

import { useState } from 'react';

interface User {
  id: string;
  email: string;
}

export default function useUser() {
  const [user] = useState<User | null>(null);
  return { user };
}
