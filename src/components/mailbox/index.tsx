import { deleteMail, useMail } from './useMail';

export const MailBox = () => {
  const { data, mutate, error, isLoading } = useMail();

  const handleOnClickDelete = (id: string) => () =>
    deleteMail(id, () =>
      mutate(
        data?.filter(({ id: staleId }) => staleId !== id),
        { revalidate: false }
      )
    );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no mail today</div>;

  return (
    <>
      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/combine/npm/purecss@3.0.0/build/tables-min.css,npm/purecss@3.0.0/build/buttons-min.css"
      />
      <table className="pure-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Contact</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, from, contact, message }) => (
            <tr key={id}>
              <td>{from}</td>
              <td>{contact}</td>
              <td>{message}</td>
              <td>
                <button onClick={handleOnClickDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
