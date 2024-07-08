import { Button } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  return(
  <>
  <Button component={Link} href = "/login">Home Button</Button>
  <Button component={Link} href = "/helpPage">Help Button</Button>
  <Button component={Link} href = "/userInfo">User Info</Button>
  <Button component={Link} href = "/dropImages">Drop Image Button</Button>
  
  <Button component={Link} href = "/Timesheet">Timesheet Button</Button>
  
  <Button component={Link} href = "/employees">Employees Button</Button>
  <Button component={Link} href = "/inDepth">Indepth Button</Button>
  <Button component={Link} href = "/createAccount">Create Account Button - FIX Create account later</Button>

  </>
  )
}
