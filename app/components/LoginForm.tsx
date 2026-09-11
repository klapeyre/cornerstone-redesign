"use client";

export default function LoginForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-5 border border-line bg-card p-8"
    >
      <div>
        <label htmlFor="username" className="field-label">
          Username
        </label>
        <input id="username" name="username" type="text" className="field" />
      </div>
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input id="password" name="password" type="password" className="field" />
      </div>
      <div>
        <label htmlFor="company" className="field-label">
          Company
        </label>
        <select id="company" name="company" className="field">
          <option>Developments</option>
          <option>Millwork</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-1 w-full">
        Log In
      </button>
    </form>
  );
}
