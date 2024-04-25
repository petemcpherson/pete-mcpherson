// This is just an example that doesn't do anything.
// You can put this on any of your pages and connect it to a simple form. 
// IMPORTANT: You would need to replace the URL with the actual Zapier webhook URL.

const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('firing function with email: ', email);

   const zapierUrl = 'https://hooks.zapier.com/hooks/catch/asdf/asdf/';

    const res = await fetch('/api/zapier', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			// goto('/thank-you-page-you-need-to-create');
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
		}
};


// standalone version

await fetch('https://hooks.zapier.com/hooks/catch/asdf/asdf/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },

    body: JSON.stringify(data)
});

